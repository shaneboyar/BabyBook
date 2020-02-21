export const lightGray = '#FAFAFA';
export const softPurple = '#824CFF';
export const white = '#FFFFFF';
export const black = '#000000';
export const transparent = 'transparent';
export const red = '#FF0000';

export const opacityColor = (color, opacity) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
  const colors = result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
  return colors
    ? `rgba(${colors.r}, ${colors.g}, ${colors.b}, ${opacity})`
    : color;
};
