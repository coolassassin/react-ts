import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import * as helpers from './helpers';
import * as themes from './themes';
import Button from './Button';
import TimeDisplay from './TimeDisplay';
import Timer from './Timer';
import { Theme } from './themes';

/**
  The author of the code clearly did a lot of unnecessary work by passing information about time and color settings through all components. All of this could have been simplified by using context!

  First, assess the situation:
  1. Open Developer Tools and ensure that render in Card is called 5 times every second.
  2. Confirm that render in Card is called when using color change buttons.
  3. Explain why render in Top is called every second, even though Top is a PureComponent and does not have currentTime in its props.
  4. Think about what needs to be done to move the New York card to the Top block and the color change buttons to the Bottom block.

  Refactor the code step by step:
  1. Create CurrentTimeContext.
  2. In the ColorsOfTime component, wrap <div className="page">...</div> in CurrentTimeContext.Provider in the render method to provide maximum access to the value of the provider. Set currentTime as the value in the Provider tag.
  3. Use CurrentTimeContext.Consumer to avoid passing currentTime through properties. The strategy here is minimization: wrap in Consumer only those components that need the resource because updating the context value will cause everything inside Consumers to be redrawn.
  4. Don't forget to remove unnecessary passing of currentTime through parameters!
  5. Open Developer Tools and see how often render in Card is called over time. Try to explain why using context led to this effect.
  6. Do the same for ThemeContext:
    - Create ThemeContext.
    - Wrap CurrentTimeContext.Provider in ThemeContext.Provider.
    - Use ThemeContext.Consumer or React.useContext to pass the theme to buttons and to Card with colored local time.
    - Clean up the code again!
  7. Add ChangeThemeContext. Let it store a reference to the dispatchChangeTheme function. Let the color change buttons now create handlers based on ChangeThemeContext instead of getting them through onPrevTheme and onNextTheme. Clean up the code.
  8. Open Developer Tools and ensure that render in Top no longer occurs. Explain why.
  9. Move London to the Top block, and behind it, move New York, Paris, and Beijing to the Top block. Move the color change buttons to the Bottom block. Was it convenient to move these components now?
  10. If context is used frequently, you can create a special HOC component to wrap components in Consumer. Find the Context in themes.js and use it as ThemeContext:
  const ThemeContext = themes.Context;

  Now you can define the button like this:
  const ThemedButton = themes.withTheme(Button);

  Use it!
 */

type ColorsOfTimeProps = { timer: Timer };

const ColorsOfTime = ({ timer }: ColorsOfTimeProps) => {
  const [currentTime, setCurrentTime] = React.useState<Date | null>(null);
  const [theme, setTheme] = React.useState<Theme>(themes.red);

  React.useEffect(() => {
    const handleTimerUpdated = (currentTime: Date | null) => {
      setCurrentTime(currentTime);
    };
    timer.addUpdated(handleTimerUpdated);
    return () => {
      timer.removeUpdated(handleTimerUpdated);
    };
  }, []);

  const dispatchChangeTheme = (type: ChangeThemeType) => {
    let newTheme = null;
    switch (type) {
      case 'prev':
        newTheme = themes.getPrevTheme(theme);
        break;
      case 'next':
        newTheme = themes.getNextTheme(theme);
        break;
    }
    setTheme(newTheme);
  };

  return (
    <div className="page">
      <h1>Цвета времени</h1>
      <Top
        theme={theme}
        onPrevTheme={() => dispatchChangeTheme('prev')}
        onNextTheme={() => dispatchChangeTheme('next')}
      />
      <Middle currentTime={currentTime} theme={theme} />
      <Bottom currentTime={currentTime} />
    </div>
  );
};

type ChangeThemeType = 'next' | 'prev';

type TopProps = { theme: Theme; onPrevTheme: () => void; onNextTheme: () => void };

const Top = React.memo(({ theme, onPrevTheme, onNextTheme }: TopProps) => {
  registerRenderForDebug('Top');
  return (
    <div className="block">
      <Button value="← цвет" theme={theme} onClick={onPrevTheme} />
      <Button value="цвет →" theme={theme} onClick={onNextTheme} />
    </div>
  );
});

type MiddleProps = {
  currentTime: Date | null;
  theme: Theme;
};

const Middle = React.memo(({ theme, currentTime }: MiddleProps) => {
  return (
    <div className="block">
      <Card title="Цветное локальное" currentTime={currentTime} color={theme.foregroundColor} />
      <Card title="Серый Лондон" timezone={+0} currentTime={currentTime} />
    </div>
  );
});

type BottomProps = { currentTime: Date | null };

const Bottom = React.memo(({ currentTime }: BottomProps) => {
  return (
    <div className="block">
      <Card title="Синий Нью-Йорк" timezone={-4} currentTime={currentTime} color="blue" />
      <Card title="Зеленый Париж" timezone={+2} currentTime={currentTime} color="green" />
      <Card title="Красный Пекин" timezone={+8} currentTime={currentTime} color="red" />
    </div>
  );
});

type CardProps = { title: string; currentTime: Date | null; color?: string; timezone?: number };

const Card = React.memo(({ currentTime, timezone, color, title }: CardProps) => {
  registerRenderForDebug('Card');
  return (
    <div className="card">
      <h3>{title}</h3>
      <div>
        <TimeDisplay time={timezone ? helpers.toTimezone(currentTime, timezone) : currentTime} color={color} />
      </div>
    </div>
  );
});

function registerRenderForDebug(name: string) {
  console.log(`render ${name} at ${new Date().toLocaleTimeString()}`);
}

const timer = new Timer();

const domNode = document.getElementById('app') as HTMLElement;
const root = createRoot(domNode);
root.render(<ColorsOfTime timer={timer} />);

/**
   Hints:
   - Creating a context:
   const CakeContext = React.createContext();
   - Providing a value:
   <CakeContext.Provider value={cheeseCake}>
   ...
   </CakeContext.Provider>
   - Consuming a value:
   <CakeContext.Consumer>
   {cake => <Hungry food={cake} />}
   </CakeContext.Consumer>
   - Alternatively, using `useContext`:
   const cake = React.useContext(CakeContext);
 */
