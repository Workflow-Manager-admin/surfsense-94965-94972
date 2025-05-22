import { format } from 'date-fns';

/**
 * Checks if the user has logged a session for the current day
 * @param {Array} sessions - Array of session objects
 * @returns {Boolean} true if no session logged today
 */
export const needsReminder = (sessions) => {
  const today = format(new Date(), 'yyyy-MM-dd');
  return !sessions.some(session => session.date === today);
};

/**
 * Creates a browser notification asking to log a session
 * (This is just a placeholder since actual notifications require user permission)
 */
export const showReminderNotification = () => {
  // In a real app, we would check for permission and show a notification
  // For now, we'll just log to console
  console.log('Reminder: Have you logged your surf session today?');
  
  // In a production app, you would use the Notifications API like this:
  /*
  if (Notification.permission === "granted") {
    new Notification("SurfSync Reminder", {
      body: "Have you logged your surf session today?",
      icon: "/logo.png"
    });
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        new Notification("SurfSync Reminder", {
          body: "Have you logged your surf session today?",
          icon: "/logo.png" 
        });
      }
    });
  }
  */
};
