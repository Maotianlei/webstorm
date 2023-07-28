import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, useCallback, lazy } from "react";

function RouterView(props) {
  const { route } = props;
  // 缓存递归结果
  const cachedFn = useCallback(get_enter, route);
  // 递归函数
  function get_deep(routes) {
    return routes.map((item, index) => {
      return (
        <Route
          key={index}
          path={item.path}
          element={<item.component route={item.children} />}
        >
          {item.children ? get_deep(item.children) : <></>}
        </Route>
      );
    });
  }

  // 开始递归
  function get_enter() {
    return get_deep(route);
  }

  return (
    <Suspense fallback={<div></div>}>
      <Routes>
        {cachedFn()}
        <Route path="*" element={<Navigate to="/NotFound" replace={true} />} />
        <Route path="/" element={<Navigate to="/Home" replace={true} />} />
      </Routes>
    </Suspense>
  );
}

export default RouterView;
