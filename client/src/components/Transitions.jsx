import { useTransition, animated, config } from 'react-spring';
import { useState } from 'react';

export function Mount(props) {
    const transitions = useTransition(props.show, {
      from: { opacity: 0 },
      enter: { opacity: 1 },
      leave: { opacity: 0 },
      reverse: props.show,
      delay: 200,
      config: config.molasses
    });

    return transitions(
      (styles, item) => item &&
        <animated.div style={styles}>
            {props.content}
        </animated.div>
    );
}

export function Toggle(props) {
  const [toggle, set] = useState(false);

  const transitions = useTransition(toggle, {
    from: { position: 'absolute', opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    reverse: toggle,
    delay: 200,
    config: config.molasses,
    onRest: () => set(!toggle),
  });

  return transitions(({ opacity }, item) =>
    item ? (
      <animated.div
        style={{
          position: 'absolute',
          opacity: opacity.to({ range: [0.0, 1.0], output: [0, 1] }),
        }}>
        {props.content1}
      </animated.div>
    ) : (
      <animated.div
        style={{
          position: 'absolute',
          opacity: opacity.to({ range: [1.0, 0.0], output: [1, 0] }),
        }}>
        {props.content2}
      </animated.div>
    )
  );
}