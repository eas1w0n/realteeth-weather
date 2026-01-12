import { Outlet } from 'react-router';

export function SearchPage() {
  return (
    <div>
      검색창
      <Outlet />
    </div>
  );
}
