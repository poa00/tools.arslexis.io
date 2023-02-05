import { ensurevisible } from "./ensurevisible.js";

/*
args = {
  node = element 
  position = 'top' | 'bottom' | 'left'| 'right'
  offsetx
  offsety
}
*/

/**
/* absolutely position args.node relative to node 
 * @param {HTMLElement} node
 * @param {Object} args
 */
export function positionnode(node, args) {
  const r = args.node.getBoundingClientRect();
  const rn = node.getBoundingClientRect();
  // console.log(`positionnode:  r:`, r);
  // console.log(`positionnode: rn:`, rn);
  const offy = args.offsety || 0;
  const pos = args.position;
  const st = node.style;

  if (pos === "bottom") {
    // bottom-center
    const y = r.bottom + offy;
    const x = r.x - rn.width / 2 + r.width / 2;
    st.left = `${x}px`;
    st.top = `${y}px`;
  } else if (pos === "bottom-left") {
    const y = r.bottom + offy;
    const x = r.x;
    st.left = `${x}px`;
    st.top = `${y}px`;
  } else if (pos == "bottom-right") {
    // TODO: should intelligently re-position if outside of visible region
    const y = r.bottom + offy;
    const x = r.x - rn.width + r.width;
    st.left = `${x}px`;
    st.top = `${y}px`;
  } else {
    throw new Error(
      `only position 'bottom', 'bottom-left', 'bottom-right' implemented, got '${pos}'`
    );
  }

  //console.log("before:", node.getBoundingClientRect());
  ensurevisible(node);
  //console.log("after:", node.getBoundingClientRect());
}
