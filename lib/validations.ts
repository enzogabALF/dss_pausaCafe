import { z } from 'zod';

// Schema de validación para parámetros de simulación
export const SimulationInputSchema = z.object({
  initialInvestment: z
    .number({
      required_error: 'La inversión inicial es requerida',
      invalid_type_error: 'La inversión debe ser un número',
    })
    .positive('La inversión inicial debe ser mayor a 0')
    .min(100000, 'La inversión mínima es de $100.000')
    .max(10000000, 'La inversión máxima es de $10.000.000'),

  costPerOrder: z
    .number({
      required_error: 'El costo por pedido es requerido',
      invalid_type_error: 'El costo debe ser un número',
    })
    .min(1, 'El costo mínimo es 1%')
    .max(100, 'El costo máximo es 100%'),

  dailyOrders: z
    .number({
      required_error: 'Los pedidos diarios son requeridos',
      invalid_type_error: 'Los pedidos deben ser un número',
    })
    .int('Los pedidos deben ser un número entero')
    .min(1, 'Debe haber al menos 1 pedido diario')
    .max(500, 'El máximo de pedidos diarios es 500'),

  averageTicket: z
    .number({
      required_error: 'El ticket promedio es requerido',
      invalid_type_error: 'El ticket debe ser un número',
    })
    .positive('El ticket promedio debe ser mayor a 0')
    .min(1000, 'El ticket mínimo es $1.000')
    .max(100000, 'El ticket máximo es $100.000'),
});

// Tipo inferido del schema
export type SimulationInput = z.infer<typeof SimulationInputSchema>;

// Función para validar y retornar errores
export function validateSimulationInput(data: unknown) {
  const result = SimulationInputSchema.safeParse(data);
  
  if (!result.success) {
    // Organizar errores por campo
    const errors: Record<string, string> = {};
    result.error.errors.forEach((err) => {
      const field = String(err.path[0]);
      errors[field] = err.message;
    });
    return { valid: false, errors };
  }
  
  return { valid: true, data: result.data };
}

// Schema de validación para guardar simulaciones
export const SaveSimulationSchema = z.object({
  name: z
    .string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  
  description: z
    .string()
    .max(500, 'La descripción no puede exceder 500 caracteres')
    .optional(),

  input: SimulationInputSchema,
});

export type SaveSimulation = z.infer<typeof SaveSimulationSchema>;
