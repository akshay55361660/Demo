// Define events for each month as separate arrays
const JanuaryEvents = [{ date: '2024-01-15', title: 'New Year Celebration', year: '2024' }];
const FebruaryEvents = [{ date: '2024-02-14', title: 'Valentine’s Day', year: '2024' }];
const MarchEvents = [{ date: '2024-03-17', title: 'St. Patrick’s Day', year: '2024' }];
const AprilEvents = [{ date: '2024-04-10', title: 'Spring Break Party', year: '2024' }];
const MayEvents = [{ date: '2024-05-01', title: 'Labor Day', year: '2024' }];
const JuneEvents = [{ date: '2024-06-15', title: 'Family Reunion', year: '2024' }];
const JulyEvents = [{ date: '2024-07-04', title: 'Independence Day', year: '2024' }];
const AugustEvents = [{ date: '2024-08-20', title: 'Summer Camp', year: '2024' }];
const SeptemberEvents = [{ date: '2024-09-15', title: 'School Starts', year: '2024' }];
const OctoberEvents = [{ date: '2024-10-31', title: 'Halloween', year: '2024' }];
const NovemberEvents = [{ date: '2024-11-25', title: 'Thanksgiving', year: '2024' }];
const DecemberEvents = [{ date: '2024-12-22', title: 'Test Event', year: '2024' }];

// Combine monthly arrays into an iterable object
const eventsByMonth = {
  January: JanuaryEvents,
  February: FebruaryEvents,
  March: MarchEvents,
  April: AprilEvents,
  May: MayEvents,
  June: JuneEvents,
  July: JulyEvents,
  August: AugustEvents,
  September: SeptemberEvents,
  October: OctoberEvents,
  November: NovemberEvents,
  December: DecemberEvents
};

// Add Symbol.iterator to make eventsByMonth iterable
eventsByMonth[Symbol.iterator] = function* () {
  for (const [month, events] of Object.entries(this)) {
    yield { month, events };
  }
};

// Display current date
function displayDate() {
  const dateBox = document.getElementById('dateBox');
  const currentDate = new Date();
  const optionsMonth = { month: 'long' };
  const optionsDay = { day: 'numeric' };

  const formattedMonth = currentDate.toLocaleDateString(undefined, optionsMonth);
  const formattedDay = currentDate.toLocaleDateString(undefined, optionsDay);

  dateBox.innerHTML = `<div>${formattedMonth}</div><div>${formattedDay}</div>`;
}

// Check for event notifications
function checkEventNotifications() {
  const eventContainer = document.getElementById('eventContainer');
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  // Get the next day's date
  const nextDay = new Date(currentDate);
  nextDay.setDate(currentDate.getDate() + 1);

  const currentMonthName = currentDate.toLocaleString('default', { month: 'long' });
  const events = eventsByMonth[currentMonthName] || [];

  // Find an event for the next day
  const upcomingEvent = events.find(event => {
    const eventDate = new Date(event.date);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate.getTime() === nextDay.getTime();
  });

  // Show event table if there is an upcoming event
  if (upcomingEvent) {
    const eventDate = new Date(upcomingEvent.date);
    const formattedEventDate = eventDate.toLocaleDateString(undefined, { day: 'numeric' }); // Only the day

    eventContainer.innerHTML = `
      <table id="eventTable">
        <tr>
          <td rowspan="2" id="eventdate">${formattedEventDate}</td>
          <td colspan="3" id="eventmonth">${currentMonthName}</td>
        </tr>
        <tr>
          <td colspan="3" id="eventyear">${upcomingEvent.year}</td>
        </tr>
      </table>`;
    eventContainer.style.display = 'block'; // Display event table
  } else {
    eventContainer.innerHTML = `<p id="noEventNotification">No upcoming events within 24 hours.</p>`;
    eventContainer.style.display = 'block'; // Display the no event notification
  }
}

// Initialize the display
window.onload = () => {
  displayDate(); // Display current date
  checkEventNotifications(); // Check for upcoming events
};
