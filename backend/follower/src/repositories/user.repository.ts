import { InternalServerError, BadRequestError } from "@instagram-clone/common";
import { neo4jDriver } from "../config/neo4j";

interface User {
  userId: string;
  email: string;
  username: string;
  profilePicture: string;
}

export class UserRepository {
  constructor(private _driver = neo4jDriver.driver) {}

  async create(user: User) {
    const session = this._driver.session();
    const { userId, email, username, profilePicture } = user;
    try {
      const result = await session.run(
        "CREATE (u:User {userId: $userId, email: $email, username: $username, profilePicture: $profilePicture, deactivated: false, banned: false}) RETURN u",
        {
          userId: userId.toString(),
          email,
          username,
          profilePicture,
        }
      );

      if (result.records.length === 0) {
        throw new InternalServerError("Error while creating user");
      }
    } catch (err) {
      console.error(err);
      throw new InternalServerError("Error while creating user");
    } finally {
      await session.close();
    }
  }

  async followUser(userId: string, followId: string) {
    const session = this._driver.session();
    try {
      console.log(userId, followId);
      const result = await session.run(
        "MATCH (u:User {userId: $userId}), (f:User {userId: $followId}) WHERE NOT u.deactivated AND NOT u.banned AND NOT f.deactivated AND NOT f.banned AND NOT (u)-[:FOLLOWS]->(f) RETURN u, f",
        {
          userId,
          followId,
        }
      );

      console.log(result.records);

      if (result.records.length === 0) {
        return false;
      }

      const followResult = await session.run(
        "MATCH (u:User {userId: $userId}), (f:User {userId: $followId}) CREATE (u)-[:FOLLOWS]->(f)",
        {
          userId,
          followId,
        }
      );

      console.log(followResult.records);
      return true;
    } catch (err) {
      console.error(err);
      throw new InternalServerError("Error while following user");
    } finally {
      await session.close();
    }
  }

  async unfollowUser(userId: string, unfollowId: string) {
    const session = this._driver.session();
    try {
      console.log(userId, unfollowId);
      const result = await session.run(
        "MATCH (u:User {userId: $userId}), (f:User {userId: $unfollowId}) WHERE NOT u.deactivated AND NOT u.banned AND NOT f.deactivated AND NOT f.banned AND (u)-[:FOLLOWS]->(f) RETURN u, f",
        {
          userId,
          unfollowId,
        }
      );

      console.log(result.records);

      if (result.records.length === 0) {
        return false;
      }

      await session.run(
        "MATCH (u:User {userId: $userId})-[r:FOLLOWS]->(f:User {userId: $unfollowId}) DELETE r",
        {
          userId,
          unfollowId,
        }
      );
      return true;
    } catch (err) {
      console.error(err);
      throw new InternalServerError("Error while unfollowing user");
    } finally {
      await session.close();
    }
  }

  async getFollowers(userId: string) {
    const session = this._driver.session();
    try {
      const user = await session.run(
        "MATCH (u:User {userId: $userId}) WHERE NOT u.deactivated AND NOT u.banned RETURN u",
        {
          userId,
        }
      );

      console.log(user.records);

      if (user.records.length === 0) {
        throw new BadRequestError("User not found");
      }

      const result = await session.run(
        "MATCH (u:User {userId: $userId})<-[:FOLLOWS]-(f:User) WHERE NOT f.deactivated AND NOT f.banned RETURN f",
        {
          userId,
        }
      );
      console.log(result.records);
      return result.records.map((record) => record.get("f").properties);
    } catch (err) {
      console.error(err);
      throw new InternalServerError("Error while getting followers");
    } finally {
      await session.close();
    }
  }

  async getFollowing(userId: string) {
    const session = this._driver.session();
    try {
      //check if user exists and is not deactivated or banned before getting the following
      const user = await session.run(
        "MATCH (u:User {userId: $userId}) WHERE NOT u.deactivated AND NOT u.banned RETURN u",
        {
          userId,
        }
      );

      console.log(user.records);

      if (user.records.length === 0) {
        throw new BadRequestError("User not found");
      }

      const result = await session.run(
        "MATCH (u:User {userId: $userId})-[:FOLLOWS]->(f:User) WHERE NOT f.deactivated AND NOT f.banned RETURN f",
        {
          userId,
        }
      );
      console.log(result.records);
      return result.records.map((record) => record.get("f").properties);
    } catch (err) {
      console.error(err);
    } finally {
      await session.close();
    }
  }
}

export default new UserRepository();
