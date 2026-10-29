import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export function jsonOk<T>(data: T, status = 200) {
  return NextResponse.json(
    {
      success: true,
      data,
      timestamp: new Date().toISOString(),
    },
    { status }
  );
}

export function jsonCreated<T>(data: T) {
  return jsonOk(data, 201);
}

export function jsonError(message: string, code = 'BAD_REQUEST', status = 400, details?: unknown) {
  return NextResponse.json(
    {
      success: false,
      error: {
        message,
        code,
        details,
      },
      timestamp: new Date().toISOString(),
    },
    { status }
  );
}

export function handleApiError(error: unknown) {
  console.error('[API Error]:', error);

  if (error instanceof ZodError) {
    const formatted = error.issues.map((i) => ({
      path: i.path.join('.'),
      message: i.message,
    }));
    return jsonError('Validation failed', 'VALIDATION_ERROR', 422, formatted);
  }

  if (error instanceof Error) {
    return jsonError(error.message, 'INTERNAL_SERVER_ERROR', 500);
  }

  return jsonError('An unexpected server error occurred', 'UNKNOWN_ERROR', 500);
}
