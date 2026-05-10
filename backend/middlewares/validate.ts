import { Request, Response, NextFunction } from "express";
import { ZodObject, ZodError } from "zod";

export const validate =
  (schema: ZodObject<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      // Parse the request parts against the schema
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next(); // Validation passed!
    } catch (error) {
      if (error instanceof ZodError) {
        // Return a clean list of errors to the user
        const formattedErrors = error.flatten().fieldErrors;
        return res.status(400).json({
          success: false,
          message: formattedErrors,
          //   errors: error.errors.map((err) => ({
          //     field: err.path[1], // e.g., "price"
          //     message: err.message, // e.g., "Price must be a positive number"
          //   })
          // ),
        });
      }
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
