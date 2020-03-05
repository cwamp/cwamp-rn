export default async function(state) {
  const context = state.get('context');
  const image = state.get('image');
  const fillText =
    state.get('fillText') || '此证件仅供办理XX业务使用, 其它用途无效';
  const colors = state.get('colors');
  const colorIndex = state.get('colorIndex');
  const color = colors.get(colorIndex);
  const opacity = state.get('opacity');
  const showName = state.get('showName');
  await drawImage(context, image, fillText, color, opacity, showName);
}

export async function drawImage(
  context,
  image,
  fillText,
  color,
  opacity,
  showName,
) {
  if (!context || !image) {
    return;
  }
  fillText = fillText || '此证件仅供办理XX业务使用, 其它用途无效';

  const {width, height} = image;
  context.clearRect(0, 0, width, height);
  context.drawImage(image, 0, 0, width, height);

  context.font = '20px';
  context.fillStyle = `rgba(${color.get('value')}, ${opacity})`;

  if (showName) {
    context.save();
    const title = '证件水印助手';
    const titleMeasure = await context.measureText(title);
    context.fillText(title, width - titleMeasure.width - 10, height - 10);
    context.restore();
  }

  const calHeight = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
  const measure = await context.measureText(fillText);
  let nums = Math.ceil(calHeight / measure.width);
  let content = '';
  while (nums >= 0) {
    if (content !== '') {
      content += '  ';
    }
    content += fillText;
    nums--;
  }

  const lines = Math.floor(calHeight / 50);
  for (let i = 0; i < lines; i++) {
    context.save();
    context.translate(width / 2, -height / 2);
    context.rotate((45 * Math.PI) / 180); //选择画布
    context.fillText(content, 0, 50 + 50 * i);
    context.restore();
  }
}
