import * as LanyardTypes from "./LanyardTypes";

enum FontStyle {
  Italic,
  Bold,
};

interface StyledText {
    text: string;
    style?: FontStyle;
}

function getSpotifyStyledText(data: LanyardTypes.Data): StyledText[] {
    return [
        {
            text: 'Listening to'
        },
        {
            text: data.spotify.song,
            style: FontStyle.Italic
        },
        {
            text: 'by'
        },
        {
            text: data.spotify.artist,
            style: FontStyle.Bold
        },
    ];
}

function getOnlineStatusStyledText(data: LanyardTypes.Data): StyledText[] {
    return [
        {
            text: 'Currently'
        },
        {
            text: data.discord_status === 'offline' ? 'offline' : 'online',
            style: FontStyle.Bold
        },
    ];
}

function getPlexStyledText(data: LanyardTypes.Data): StyledText[] {
    let activity = data.activities[0];
    let mediaName = activity.details ?? "";
    var mediaInfo = activity.state.substring(activity.state.indexOf("·"));
    return [
        {
            text: 'Watching'
        },
        {
            text: mediaName + ' ' + mediaInfo,
            style: FontStyle.Bold
        },
    ];
}

function getGenericPlayingStyledText(data: LanyardTypes.Data): StyledText[] {
    return [
        {
            text: 'Playing'
        },
        {
            text: data.activities[0].name,
            style: FontStyle.Bold
        }
    ];
}

function trimStyledText(styledTextArray: StyledText[]): StyledText[] {
    var trimmedStyledText: StyledText[] = [];
    var charCount = 0;
    for (let styledText of styledTextArray) {
        if (charCount + styledText.text.length > 40) {
            let trimmed: StyledText = {
                text: styledText.text.substring(0, 37 - charCount) + '...',
                style: styledText.style
            }
            trimmedStyledText.push(trimmed);
            break;
        }
        trimmedStyledText.push(styledText);
        charCount += styledText.text.length;
    }
    return trimmedStyledText;
}

function getUntrimmedStyledText(data: LanyardTypes.Data): StyledText[] {
    if (data.activities.length === 0) {
        return getOnlineStatusStyledText(data);
    }

    let activityName = data.activities[0].name;
    switch (activityName) {
        case 'Spotify':
            return getSpotifyStyledText(data);
        case 'Plex':
            return getPlexStyledText(data);
        default:
            return getGenericPlayingStyledText(data);
    }
}

function getTextMarkup(data: LanyardTypes.Data): string {
    var textMarkupBuilder: string[] = [];
    var styledTextArray = trimStyledText(getUntrimmedStyledText(data));
    for (let styledText of styledTextArray) {
        let bold = styledText.style === FontStyle.Bold ? ` font-weight="bold"` : '';
        let italic = styledText.style === FontStyle.Italic ? ` font-style="italic"` : '';
        textMarkupBuilder.push(`<tspan${bold}${italic}>${styledText.text}</tspan>\n`);
    }
    return textMarkupBuilder.join('');
}

const renderCard = async (body: LanyardTypes.Root): Promise<string> => {
    if (!body.success) return "";

    let textMarkup: string = getTextMarkup(body.data);

    return `
    <svg width="410" height="50" xmlns="http://www.w3.org/2000/svg">
        <text x="205" y="25" text-anchor="middle">
            ${textMarkup}
        </text>
        <style>
            text {
                font-family: Helvetica, Sans-Serif, 'Comic Sans MS';
                fill: #ddd;
            }
        </style>
    </svg> 
    `;
};

export default renderCard;
