export function getTrimmedTitle(title) {
  if (title.length > 30) {
    var trimmedTitle = title.substr(0, 25);
    trimmedTitle = trimmedTitle.concat("...");
    return trimmedTitle;
  } else return title;
}
