import * as LanyardTypes from "./LanyardTypes";

const renderCard = async (body: LanyardTypes.Root): Promise<string> => {
    let { data } = body;

    var regularText: String = "currently";
    var boldText: String = "online";
    
    if (data.listening_to_spotify) {
        regularText = "listening to";
        boldText = data.spotify.song;
    }
    else if (data.activities.length > 0) {
        let activityName = data.activities[0].name;
        if (activityName == "Plex") {
            let mediaName = data.activities[0].details ?? "";
            let activityState = data.activities[0].state;
            var mediaInfo = activityState.substring(activityState.indexOf("·"));
            regularText = "watching";
            boldText = mediaName + " " + mediaInfo;
        }
        else {
            regularText = "playing";
            boldText = activityName;
        }
    }
    else if (data.discord_status === "offline") {
        boldText = "offline";
    }

    if (regularText.length + boldText.length > 40) {
        boldText = boldText.substring(0, 37 - regularText.length) + "...";
    }

    boldText = boldText.toLowerCase();

    return `
    <svg width="410" height="50" xmlns="http://www.w3.org/2000/svg">
        <text x="205" text-anchor="middle">
            <tspan dy="1.2rem">${regularText}</tspan>
            <tspan font-weight="bold">${boldText}</tspan>
        </text>
        <style>
            text {
                font-family: 'Comic Sans MS';
                fill: #ddd;
            }
        </style>
    </svg> 
    `;
};

export default renderCard;
