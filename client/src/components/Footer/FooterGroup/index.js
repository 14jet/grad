import LLink from "../../../components/LLink";

function FooterGroup({ footerItem }) {
  return (
    <div className="mb-4">
      <h6>{footerItem.title}</h6>

      <ul>
        {footerItem.items.map((item, index) => (
          <li key={index}>
            {item.url ? (
              <a className="d-block mb-1 " href={item.url}>
                {item.icon} {item.label}
              </a>
            ) : item.path ? (
              <LLink
                className="d-block mb-1 "
                to={item.path}
                onClick={() =>
                  window.scroll({
                    top: 0,
                    left: 0,
                  })
                }
              >
                {item.icon} {item.label}
              </LLink>
            ) : (
              <p className="mb-1 ">
                {item.icon} {item.label}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FooterGroup;
