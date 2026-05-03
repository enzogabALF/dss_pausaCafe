export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  cost: number;
  margin: number;
  sales: number;
  trend: 'up' | 'down' | 'stable';
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Espresso Doble',
    category: 'Bebidas Calientes',
    price: 3.5,
    cost: 0.8,
    margin: 77.1,
    sales: 234,
    trend: 'up',
  },
  {
    id: '2',
    name: 'Cappuccino',
    category: 'Bebidas Calientes',
    price: 4.5,
    cost: 1.2,
    margin: 73.3,
    sales: 189,
    trend: 'up',
  },
  {
    id: '3',
    name: 'Latte Macchiato',
    category: 'Bebidas Calientes',
    price: 5.0,
    cost: 1.5,
    margin: 70.0,
    sales: 156,
    trend: 'stable',
  },
  {
    id: '4',
    name: 'Iced Coffee',
    category: 'Bebidas Frías',
    price: 4.0,
    cost: 1.0,
    margin: 75.0,
    sales: 98,
    trend: 'down',
  },
  {
    id: '5',
    name: 'Croissant Clásico',
    category: 'Pastelería',
    price: 2.8,
    cost: 0.9,
    margin: 67.9,
    sales: 312,
    trend: 'stable',
  },
  {
    id: '6',
    name: 'Sándwich Premium',
    category: 'Comida',
    price: 8.5,
    cost: 3.2,
    margin: 62.4,
    sales: 87,
    trend: 'up',
  },
];

export default function ProductTable() {
  return (
    <div className="products-table-container">
      <table className="products-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Costo</th>
            <th>Margen %</th>
            <th>Ventas Hoy</th>
            <th>Tendencia</th>
          </tr>
        </thead>
        <tbody>
          {MOCK_PRODUCTS.map((product) => (
            <tr key={product.id} className="product-row">
              <td className="product-name">{product.name}</td>
              <td className="product-category">{product.category}</td>
              <td className="product-price">${product.price.toFixed(2)}</td>
              <td className="product-cost">${product.cost.toFixed(2)}</td>
              <td className="product-margin">
                <span className="margin-badge">{product.margin.toFixed(1)}%</span>
              </td>
              <td className="product-sales">{product.sales}</td>
              <td className="product-trend">
                <span className={`trend-badge trend-${product.trend}`}>
                  {product.trend === 'up' && '📈'}
                  {product.trend === 'down' && '📉'}
                  {product.trend === 'stable' && '➡️'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
