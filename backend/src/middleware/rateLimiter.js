import ratelimit from"../config/upstash.js";

const rateLimiter = async (req,res,next) => {
    try{
        const ip=req.ip || req.headers["x-forwarded-for"] || "anonymous";
        const { success } = await ratelimit.limit(ip);
        if(!success){
            return res.status(429).json({message: "TOO many request,please try again"});
        }
        next();
    }catch(error){
        console.error("Rate limiter error:", error);
        next(error);
    }
};
export default rateLimiter;