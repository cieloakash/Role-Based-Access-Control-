import jwt from "jsonwebtoken";

const tokenVerify = (allowedRoles = []) => {
  return (req, res, next) => {  
    // 1. Get authorization header
    const authHeader = req.headers.authorization || req.headers.Authorization;
    
    // 2. Verify header format
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false,
        message: "Authorization header missing or invalid (Format: 'Bearer token')"
      });
    }

    // 3. Extract and validate token
    const token = authHeader.split(' ')[1]?.trim();
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token not provided"
      });
    }

    try {
      // 4. Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // 5. Validate and normalize user data
      if (!decoded.id || !decoded.role) {
        return res.status(401).json({
          success: false,
          message: "Invalid token payload"
        });
      }

      const userRole = decoded.role.toLowerCase();
      req.user = {
        id: decoded.id.toString(),
        role: userRole
      };

      // 6. Check roles if specified
      if (allowedRoles.length > 0) {
        const normalizedRoles = allowedRoles.map(r => r.toLowerCase());
        if (!normalizedRoles.includes(userRole)) {
          return res.status(403).json({
            success: false,
            message: `Access forbidden. Required roles: ${allowedRoles.join(', ')}`,
            yourRole: userRole
          });
        }
      }

      next();
    } catch (error) {

      return res.status(401).json({
        success: false,
        message:"server error",

      });
    }
  };
};


export default  tokenVerify;
