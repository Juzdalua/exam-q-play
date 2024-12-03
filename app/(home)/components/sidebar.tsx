"use client";

const Sidebar = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <div className={`${isVisible ? "translate-x-0" : "-translate-x-full"} fixed left-0 top-20 w-56 h-full bg-base-200`}>
      <ul className="menu bg-base-200 rounded-box w-56">
        <li>
          <a>Item 1</a>
        </li>
        <li>
          <details open>
            <summary>Parent</summary>
            <ul>
              <li>
                <a>Submenu 1</a>
              </li>
              <li>
                <a>Submenu 2</a>
              </li>
              <li>
                <details open>
                  <summary>Parent</summary>
                  <ul>
                    <li>
                      <a>Submenu 1</a>
                    </li>
                    <li>
                      <a>Submenu 2</a>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <a>Item 3</a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
