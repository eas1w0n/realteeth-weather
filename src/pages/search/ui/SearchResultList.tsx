import { useNavigate, useSearchParams } from 'react-router';

const MOCK_RESULTS = [
  { id: 1, city: '대전', country: 'KR' },
  { id: 2, city: '대구', country: 'KR' },
  { id: 3, city: '대전광역시', country: 'KR' },
  { id: 4, city: '서울', country: 'KR' },
  { id: 5, city: 'Denver', country: 'US' },
];

export function SearchResultList() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q')?.trim() ?? '';

  if (!query) return null;

  const results = MOCK_RESULTS.filter(item => item.city.includes(query));

  return (
    <ul className="mt-4 divide-y divide-slate-200">
      {results.map(item => (
        <li
          key={item.id}
          className="cursor-pointer px-2 py-4 transition hover:bg-slate-100 active:bg-slate-200"
          onClick={() => {
            console.log('선택:', item.city);
            // navigate(`/weather/${item.city}`);
          }}>
          <p className="text-base font-medium">{item.city}</p>
          <p className="text-muted-foreground text-sm">{item.country}</p>
        </li>
      ))}

      {results.length === 0 && (
        <li className="text-muted-foreground px-2 py-6 text-center text-sm">검색 결과가 없습니다.</li>
      )}
    </ul>
  );
}
