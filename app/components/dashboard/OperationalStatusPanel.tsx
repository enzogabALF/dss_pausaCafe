'use client';

import { useEffect, useState } from 'react';
import type { OperationsSnapshot } from '@/lib/types';

export function OperationalStatusPanel() {
  const [snapshot, setSnapshot] = useState<OperationsSnapshot | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadOperations = async () => {
      try {
        const endpoint = new URL('/api/operations', window.location.origin || 'http://localhost').toString();
        const response = await fetch(endpoint);
        const payload = await response.json();

        if (mounted && payload?.data) {
          setSnapshot(payload.data as OperationsSnapshot);
        }
      } catch (error) {
        console.error('No se pudieron cargar las operaciones:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadOperations();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return <article className="panel panel-wide">Cargando estado operativo...</article>;
  }

  if (!snapshot) {
    return <article className="panel panel-wide">No se pudo obtener el estado operativo.</article>;
  }

  return (
    <article className="panel panel-wide">
      <div className="panel-title-row">
        <h2>Estado Operativo</h2>
        <span>Inventario y capacidad de personal</span>
      </div>

      <div className="kpi-grid">
        <article className="kpi-card">
          <p>Cobertura de stock</p>
          <strong>{snapshot.stockCoverage.toFixed(1)}%</strong>
          <span>{snapshot.criticalItems} insumos críticos</span>
        </article>
        <article className="kpi-card">
          <p>Utilización operativa</p>
          <strong>{snapshot.capacityUtilization.toFixed(1)}%</strong>
          <span>{snapshot.activeStaff} personas activas</span>
        </article>
      </div>

      <div className="operational-list">
        {snapshot.inventory.slice(0, 4).map((item) => (
          <div key={item.id} className="operational-row">
            <div>
              <strong>{item.name}</strong>
              <p>{item.category}</p>
            </div>
            <span>
              {item.stock}/{item.target} {item.unit}
            </span>
          </div>
        ))}
      </div>
    </article>
  );
}
