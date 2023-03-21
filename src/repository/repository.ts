import { Inject, Service } from "typedi";

@Service()
class Repository {
  constructor(@Inject("mongoAdapter") private mongoAdapter) {}

  public async getAllMovies(): Promise<any[]> {
    try {
      await this.mongoAdapter.connect();
      let movies = await this.mongoAdapter.getAllMovies();
      movies = movies.map((movie) => {
        const { _id, ...result } = movie;
        return result;
      });
      return movies;
    } finally {
      await this.mongoAdapter.close();
    }
  }

  public async getOneMovie(
    title: string,
    release_year: number
  ): Promise<any[]> {
    try {
      await this.mongoAdapter.connect();
      const movie = await this.mongoAdapter.getOneMovie(title, release_year);

      const { _id, ...result } = movie[0] || {};
      return result;
    } finally {
      await this.mongoAdapter.close();
    }
  }

  public async addMovie(
    title: string,
    release_year: number,
    director: string,
    rating: number
  ): Promise<any> {
    try {
      const _id = `${title.replaceAll(" ", "-")}_${release_year}`;
      const filter = { _id };
      const update = {
        _id,
        title,
        release_year,
        director,
        rating,
      };
      await this.mongoAdapter.connect();
      const result = await this.mongoAdapter.updateMovie(filter, update, true);
      return result;
    } finally {
      await this.mongoAdapter.close();
    }
  }

  public async editMovie(
    title: string,
    release_year: number,
    director: string,
    rating: number
  ): Promise<any> {
    try{
      const _id = `${title.replaceAll(" ", "-")}_${release_year}`;
      const filter = { _id };
      let update = {};
      if (director) {
        update = { ...update, director };
      }
      if (rating) {
        update = { ...update, rating };
      }
      await this.mongoAdapter.connect();
      const result = await this.mongoAdapter.updateMovie(filter, update, false);
      return result;
    } finally {
      await this.mongoAdapter.close();
    }
  }

  public async deleteMovie(title: string, release_year: number): Promise<any> {
    try {
      await this.mongoAdapter.connect();
      const result = await this.mongoAdapter.deleteMovie(title, release_year);
      return result;
    } finally {
      await this.mongoAdapter.close();
    }
  }
}

export default Repository;
