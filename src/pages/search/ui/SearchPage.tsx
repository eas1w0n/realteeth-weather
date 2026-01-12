import { Outlet, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import MenuIcon from '@/assets/icons/menu.svg?react';
import SearchIcon from '@/assets/icons/search.svg?react';

export function SearchPage() {
  const [keyword, setKeyword] = useState('');
  const hasKeyword = keyword.trim().length > 0;
  const navigate = useNavigate();

  // keyword 변화에 따라 라우팅
  useEffect(() => {
    if (hasKeyword) {
      navigate(`/search/result?q=${keyword}`, { replace: true });
    } else {
      navigate('/search', { replace: true });
    }
  }, [hasKeyword, keyword, navigate]);

  return (
    <div className="mx-auto min-h-screen w-full max-w-150 bg-white px-5 py-6">
      <div className="mb-3 flex items-center gap-2.5">
        <InputGroup className="h-12 flex-1 rounded-full border-0 bg-slate-100">
          <InputGroupInput
            placeholder="도시를 입력해주세요."
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            className="text-base placeholder:text-base"
          />
          <InputGroupAddon>
            <SearchIcon className="h-10 w-10 text-gray-600" />
          </InputGroupAddon>
        </InputGroup>

        {/**검색어 없을 때만 메뉴 버튼 노출 */}
        {!hasKeyword && (
          <button
            className="flex h-10 w-10 items-center justify-center text-gray-600 transition hover:text-black active:text-gray-400"
            onClick={() => console.log('클릭!')}>
            <MenuIcon />
          </button>
        )}
      </div>
      <Outlet />
    </div>
  );
}
