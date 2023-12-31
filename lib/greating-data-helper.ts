export function getGreeting(): {greeting: { message: string; icon: string; }; formattedDate: string;} {
    const [morning , afternoon, evening] = [{message:"Good morning",icon : "🌞"}, {message:"Good afternoon",icon : "🌇"}, {message:"Good evening",icon : "🌆"}];
    const date = new Date();
    new Intl.DateTimeFormat('en-GB', {
        dateStyle: 'full',
        timeStyle: 'long',
        timeZone: 'Australia/Sydney',
    }).format(date)
    const hours = date.getHours();
    let greeting: { message: string; icon: string; };

    if (hours >= 5 && hours < 12) {
        greeting = morning;
    } else if (hours >= 12 && hours < 18) {
        greeting = afternoon;
    } else {
        greeting = evening;
    }

    const formattedDate = date.toLocaleDateString('en-US', { dateStyle: 'medium' });

    return {
        greeting,
        formattedDate
    };
}
