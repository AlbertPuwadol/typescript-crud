import { Service } from "typedi";
import { Collection, MongoClient } from "mongodb";

@Service()
class MongoAdapter {
  private collection?: Collection;
  private connection?: MongoClient;

  constructor(
    private readonly username: string,
    private readonly password: string,
    private readonly host: string,
    private readonly port: number,
    private readonly databaseName: string,
    private readonly collectionName: string,
    private readonly authDatabase: string
  ) {}

  public async connect(): Promise<void> {
    const uri = `mongodb://${this.username}:${this.password}@${this.host}:${this.port}/${this.authDatabase}`;
    this.connection = await new MongoClient(uri).connect();
    this.collection = this.connection
      .db(this.databaseName)
      .collection(this.collectionName);
  }

  public async close(): Promise<void> {
    if (this.connection) {
      await this.connection.close();
    }
  }

  public async getAllMovies(): Promise<any[]> {
    const movies = await this.collection.find({}).toArray();
    return movies;
  }

  public async getOneMovie(
    title: string,
    release_year: number
  ): Promise<any[]> {
    const movie = await this.collection.find({ title, release_year }).toArray();
    return movie;
  }

  public async updateMovie(filter: any, update: any, upsert: boolean): Promise<any> {
    const result = await this.collection.updateOne(
      filter,
      { $set: update },
      {
        upsert
      }
    );
    return result;
  }

  public async deleteMovie(title: string, release_year: number): Promise<any> {
    const result = await this.collection.deleteOne({ title, release_year });
    return result;
  }
}

export default MongoAdapter;
