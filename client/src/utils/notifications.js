export const requestNotificationPermission = async () => {
  if (!("Notification" in window)) {
    return false;
  }

  const permission = await Notification.requestPermission();

  return permission === "granted";
};

export const showNotification = (title, body) => {
  if (Notification.permission !== "granted") return;

  new Notification(title, {
    body,
    icon: "/favicon.ico",
  });
};
