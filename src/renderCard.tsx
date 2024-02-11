import * as LanyardTypes from "./LanyardTypes";

type Parameters = {
    lightMode?: string;
    leftAlign?: string;
    color?: string;
};

enum FontStyle {
  Italic,
  Bold,
};

interface StyledText {
    text: string;
    style?: FontStyle;
}

const parseBool = (string: string | undefined): boolean => string === "true" ? true : false;

function getSpotifyStyledTextArray(data: LanyardTypes.Data): StyledText[] {
    let styledText: StyledText[] = [
        {
            text: 'Listening to '
        },
        {
            text: data.spotify.song,
            style: FontStyle.Italic
        },
        {
            text: ' by '
        },
        {
            text: data.spotify.artist,
            style: FontStyle.Bold
        },
    ];

    return trimStyledTextArray(styledText);
}

function getOnlineStatusStyledTextArray(data: LanyardTypes.Data): StyledText[] {
    let styledText: StyledText[] = [
        {
            text: 'Currently '
        },
        {
            text: data.discord_status === 'offline' ? 'offline' : 'online',
            style: FontStyle.Bold
        },
    ];

    return trimStyledTextArray(styledText);
}

function getPlexStyledTextArray(data: LanyardTypes.Data): StyledText[] {
    let activity = data.activities[0];
    let mediaName = activity.details ?? "";
    let mediaInfo = activity.state.substring(activity.state.indexOf("·"));

    let styledText: StyledText[] = [
        {
            text: 'Watching '
        },
        {
            text: `${mediaName} ${mediaInfo}`,
            style: FontStyle.Bold
        },
    ];

    return trimStyledTextArray(styledText);
}

function getGenericPlayingStyledTextArray(data: LanyardTypes.Data): StyledText[] {
    let styledText: StyledText[] = [
        {
            text: 'Playing '
        },
        {
            text: data.activities[0].name,
            style: FontStyle.Bold
        }
    ];

    return trimStyledTextArray(styledText);
}

function trimStyledTextArray(styledTextArray: StyledText[]): StyledText[] {
    var trimmedStyledTextArray: StyledText[] = [];
    var charCount = 0;
    for (let styledText of styledTextArray) {
        if (charCount + styledText.text.length > 40) {
            let trimmed: StyledText = {
                text: styledText.text.substring(0, 37 - charCount) + '...',
                style: styledText.style
            }
            trimmedStyledTextArray.push(trimmed);
            break;
        }
        trimmedStyledTextArray.push(styledText);
        charCount += styledText.text.length;
    }
    return trimmedStyledTextArray;
}

function getStyledTextArray(data: LanyardTypes.Data): StyledText[] {
    if (data.activities.length === 0) {
        return getOnlineStatusStyledTextArray(data);
    }

    let activityName = data.activities[0].name;
    switch (activityName) {
        case 'Spotify':
            return getSpotifyStyledTextArray(data);
        case 'Plex':
            return getPlexStyledTextArray(data);
        default:
            return getGenericPlayingStyledTextArray(data);
    }
}

function getTextMarkup(data: LanyardTypes.Data): string {
    let styledTextArray = getStyledTextArray(data);

    var textMarkupBuilder: string[] = [];
    for (let styledText of styledTextArray) {
        let bold = styledText.style === FontStyle.Bold ? ` font-weight="bold"` : '';
        let italic = styledText.style === FontStyle.Italic ? ` font-style="italic"` : '';
        textMarkupBuilder.push(`<tspan${bold}${italic}>${styledText.text}</tspan>`);
    }
    return textMarkupBuilder.join('');
}

function getTextColor(lightMode: boolean, color?: string): string {
    if (color) {
        return `#${color}`;
    }
    return lightMode ? '#222' : '#ddd';
}

const renderCard = async (body: LanyardTypes.Root, params: Parameters): Promise<string> => {
    if (!body.success) return "";

    let lightMode = parseBool(params.lightMode);
    let leftAlign = parseBool(params.leftAlign);
    let color = params.color;

    let textMarkup: string = getTextMarkup(body.data);
    let textColor = getTextColor(lightMode, color);

    return `
    <svg width="410" height="50" xmlns="http://www.w3.org/2000/svg">
        <text ${leftAlign ? `x="5"` : `x="205" text-anchor="middle"`} y="31">
            ${textMarkup}
        </text>
        <style>
            text {
                font-size: 16px;
                font-family: Helvetica, Sans-Serif, 'Comic Sans MS';
                fill: ${textColor};
            }
        </style>
    </svg> 
    `;
};

export default renderCard;
