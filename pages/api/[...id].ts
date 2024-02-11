import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import renderCard from "../../src/renderCard";
import { isSnowflake } from "../../src/snowflake";
import redis from "../../src/redis";

type Data = {
    id?: string | string[];
    error?: any;
    code?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    let getUser;

    if (!req.query.id)
        return res.send({
            error: `No ID provided.`,
        });

    const params = req.query;
    const userId = req.query.id[0];

    if (!isSnowflake(userId))
        return res.send({
            error: `That is not a valid snowflake ID!`,
        });

    try {
        getUser = await axios(`https://api.lanyard.rest/v1/users/${userId}`);
    } catch (error: any) {
        if (error.response.data && error.response.data.error.message)
            return res
                .status(404)
                .send({ error: error.response.data.error.message, code: error.response.data.error.code });

        if (error.response.status === 404) return res.status(404).send({ error: "Invalid user!" });

        console.log(error);

        return res.status(400).send({
            error: `Something went wrong!`,
        });
    }

    try {
        let user = await redis.hget("users", userId);
        if (!user) await redis.hset("users", userId, "true");
    } catch {
        null;
    }

    res.setHeader("Content-Type", "image/svg+xml; charset=utf-8");
    res.setHeader("content-security-policy", "default-src 'none'; img-src * data:; style-src 'unsafe-inline'");

    const svg = await renderCard(getUser.data, params);
    res.status(200).send(svg as any);
}
