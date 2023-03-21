import { Service, Inject } from "typedi";

@Service()
class UseCase {
  constructor(@Inject('repository') private repository) {}

  public async getAllMovies(): Promise<any[]> {
    const movies = await this.repository.getAllMovies();
    return movies;
  }

  public async getOneMovie(title: string, release_year: number): Promise<any[]> {
    const movie = await this.repository.getOneMovie(title, release_year);
    return movie;
  }

  public async addMovie(title: string, release_year: number, director: string, rating: number): Promise<any> {
    const result = await this.repository.addMovie(title, release_year, director, rating);
    return result;
  }

  public async editMovie(title: string, release_year: number, director: string, rating: number): Promise<any> {
    const result = await this.repository.editMovie(title, release_year, director, rating);
    return result;
  }

  public async deleteMovie(title: string, release_year: number): Promise<any> {
    const result = await this.repository.deleteMovie(title, release_year);
    return result;
  }
}

export default UseCase;
