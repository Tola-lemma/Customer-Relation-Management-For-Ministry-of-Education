import rateLimit from "express-rate-limit";
import slowDown from "express-slow-down";

export const loginLmiter = rateLimit({
  windowMs: 10 * 60 * 1000, //10 minutes
  max: 5, //limit each Ip to 5 attempts per windowMS
  message: "Too many login attempts, please try again later",
  keyGenerator: function (req) {
    return req.ip + "-login";
  },
  skipSuccessfulRequests: true, // Only count failed requests
});

export const resetPasswordLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minites
  max: 3, //limit each Ip to 3 attempts per windowMS
  message: "Too many password reset attempts, please try again later",
  keyGenerator: function (req) {
    return req.ip + "-reset-password";
  },
  skipSuccessfulRequests: true, //// Only count failed requests
});

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

export const loginSpeedLimiter = slowDown({
  windowMs: 10 * 60 * 1000, // 10 minutes
  delayAfter: 5, // allow 5 requests to go at full-speed, then...
  delayMs: 100, // 5th request has a 100ms delay...
});

export const resetPasswordSpeedLimiter = slowDown({
  windowMs: 10 * 60 * 1000, // 10 minutes
  delayAfter: 3, // allow 3 requests to go at full-speed, then...
  delayMs: 100, // 4th request has a 100ms delay...
});

export const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 200, // allow 100 requests per 15 minutes, then...
  delayMs: 500, // begin adding 500ms of delay per request above 100:
});
