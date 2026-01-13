import { useNavigate, useSearchParams } from 'react-router';
import { normalizeDistricts } from '@/shared/lib/location/normalizeDistricts';
import { searchDistricts } from '@/shared/lib/location/searchDistricts';
import { useMemo } from 'react';

export function SearchResultList() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q')?.trim() ?? '';
  const districts = useMemo(() => normalizeDistricts(), []);
  const results = useMemo(() => searchDistricts(districts, query), [districts, query]);

  if (!query) return null;

  return (
    <ul className="mt-4 divide-y divide-slate-200">
      {results.map(d => (
        <li
          key={d.fullName}
          className="cursor-pointer px-2 py-4 transition hover:bg-slate-100 active:bg-slate-200"
          onClick={() => {
            navigate(`/search/weather/${d.fullName}`);
          }}>
          <p className="text-base font-medium">{d.fullName}</p>
        </li>
      ))}

      {results.length === 0 && (
        <li className="text-muted-foreground px-2 py-6 text-center text-sm">검색 결과가 없습니다.</li>
      )}
    </ul>
  );
}
