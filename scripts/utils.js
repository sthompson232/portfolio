export const getCookie = (name) => {
  let cookieValue = null;
  if (import.meta.client && document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}

export const debounce = (func, delay) => {
  let timerId; // Holds a reference to the timeout between calls.
  return (...args) => {
    clearTimeout(timerId); // Clears the current timeout, if any, to reset the debounce timer.
    timerId = setTimeout(() => {
        func.apply(this, args); // Calls the passed function after the specified delay with the correct context and arguments.
    }, delay);
  };
};

export const setCookie = (name, value, days) => {
  let expires = "";
  if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
  }
  if (import.meta.client) {
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
  }
}

export const isTouchDevice = () => {
  if (import.meta.client) {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }
  return false;
};

export const slugify = (value) => {
  return value.replace(/[^\w ]+/g, '').replace(/ +/g, '-').toLowerCase();
}

export const timeSince = (time) => {
  const formatter = new Intl.RelativeTimeFormat('en');
  const diff = Math.abs(new Date().getTime() - new Date(time).getTime());
  const timeMinutes = Math.floor(diff / (1000 * 60));
  const timeHours = Math.floor(diff / (1000 * 60 * 60));
  const timeDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const timeYears = Math.floor(diff / (1000 * 60 * 60 * 24 * 365)); 

  if (timeMinutes < 60) {
    return formatter.format(-timeMinutes, 'minutes');
  } else if (timeHours < 24) {
    return formatter.format(-timeHours, 'hours');
  } else if (timeDays < 365) {
    return formatter.format(-timeDays, 'days');
  } else {
    return formatter.format(-timeYears, 'years');
  }
}

export function isHovered(element, mouseX, mouseY) {
  const { left, top, right, bottom } = element.getBoundingClientRect();
  return mouseX >= left && mouseX <= right && mouseY >= top && mouseY <= bottom;
}

// Linear interpolation
export const lerp = (a, b, n) => (1 - n) * a + n * b;

export const clamp = (num, min, max) => {
  if (num <= min) {
    return min;
  } else if (num >= max) {
    return max;
  }
  return num;
};

export const getMousePos = (e) => {
  return { 
    x : e.clientX, 
    y : e.clientY,
  };
};

// Distance between two points
export const distance = (x1, y1, x2, y2) => {
  return Math.hypot(x2-x1, y2-y1);
}

// Slope intercept form
export const lineEq = (y2, y1, x2, x1, currentVal) => {
  // y = mx + b
  const m = (y2 - y1) / (x2 - x1)
  const b = y1 - m * x1;
  return m * currentVal + b;
};

export const mix = (x, y, a) => {
  return x * (1 - a) + y * a;
}

export const mixColors = (rgb1, rgb2, ratio) => {
  const newR = mix(rgb1.r, rgb2.r, ratio);
  const newG = mix(rgb1.g, rgb2.g, ratio);
  const newB = mix(rgb1.b, rgb2.b, ratio);
  return `rgb(${newR}, ${newG}, ${newB})`;
}
