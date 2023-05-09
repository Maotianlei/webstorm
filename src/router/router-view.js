import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";

function RouterView(props) {
  return (
    <Suspense fallback={<div></div>}>
      <Routes>
        {props.route.map((item, index) => {
          return item.path ? (
            <Route
              key={index}
              exact={item.exact}
              path={item.path}
              element={<item.component route={item.routes} />}
            />
          ) : (
            <Route key={index} element={item.component} />
          );
        })}
      </Routes>
    </Suspense>
  );
}

export default RouterView;
