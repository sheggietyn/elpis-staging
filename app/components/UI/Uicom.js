import React from "react";

// CardHeader
export const CardHeader = React.forwardRef(
  ({ className = "", ...rest }, ref) => (
    <div
      ref={ref}
      className={`flex flex-col space-y-1.5 p-6 ${className}`}
      {...rest}
    />
  )
);

// CardTitle
export const CardTitle = React.forwardRef(
  ({ className = "", ...rest }, ref) => (
    <h3
      ref={ref}
      className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
      {...rest}
    />
  )
);

// CardDescription
export const CardDescription = React.forwardRef(
  ({ className = "", ...rest }, ref) => (
    <p
      ref={ref}
      className={`text-sm text-muted-foreground ${className}`}
      {...rest}
    />
  )
);

// CardContent
export const CardContent = React.forwardRef(
  ({ className = "", ...rest }, ref) => (
    <div ref={ref} className={`p-6 pt-0 ${className}`} {...rest} />
  )
);

// CardFooter
export const CardFooter = React.forwardRef(
  ({ className = "", ...rest }, ref) => (
    <div
      ref={ref}
      className={`flex items-center p-6 pt-0 ${className}`}
      {...rest}
    />
  )
);
