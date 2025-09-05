type Props = { units: 'metric' | 'imperial'; onChange: (u: 'metric' | 'imperial') => void; };

export default function UnitsToggle({ units, onChange }: Props) {
  return (
    <select value={units} onChange={(e)=>onChange(e.target.value as any)}
            style={{ padding:10, border:'1px solid #ddd', borderRadius:8 }}>
      <option value="metric">°C</option>
      <option value="imperial">°F</option>
    </select>
  );
}
