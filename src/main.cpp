#include <set>
#include <string>
#include <tuple>
#include <unordered_map>
#include <vector>

using namespace std;

class MovieRentingSystem {
 private:
  // shopMovie => price
  unordered_map<string, int> shopMovie2price;
  // unrentedMovie => (price, shop)
  unordered_map<int, set<pair<int, int>>> unrentedMovie2priceShop;
  // (price, shop, rentedMovie)
  set<tuple<int, int, int>> rentedMovies;

  string getShopMovieKey(int shop, int movie) {
    return to_string(shop) + ',' + to_string(movie);
  }

 public:
  MovieRentingSystem(int n, vector<vector<int>>& entries) {
    for (auto& e : entries) {
      auto shop = e[0], movie = e[1], price = e[2];
      auto shopMovieKey = this->getShopMovieKey(shop, movie);
      this->shopMovie2price[shopMovieKey] = price;

      if (this->unrentedMovie2priceShop.find(movie) ==
          this->unrentedMovie2priceShop.cend()) {
        this->unrentedMovie2priceShop[movie] =
            set<pair<int, int>>{pair<int, int>{price, shop}};
      } else {
        this->unrentedMovie2priceShop[movie].emplace(pair<int, int>{price, shop});
      }
    }
  }

  vector<int> search(int movie) {
    auto ans = vector<int>{};

    auto it = unrentedMovie2priceShop.find(movie);
    if (it == unrentedMovie2priceShop.cend()) {
      return ans;
    }

    for (auto& [_, shop] : it->second) {
      // ans.push_back(shop);
      ans.emplace_back(shop);
      if (ans.size() == 5) {
        break;
      }
    }
    return ans;
  }

  void rent(int shop, int movie) {
    auto shopMovieKey = this->getShopMovieKey(shop, movie);
    auto price = this->shopMovie2price[shopMovieKey];
    this->unrentedMovie2priceShop[movie].erase({price, shop});
    this->rentedMovies.emplace(tuple<int, int, int>{price, shop, movie});
  }

  void drop(int shop, int movie) {
    auto shopMovieKey = this->getShopMovieKey(shop, movie);
    auto price = shopMovie2price[shopMovieKey];
    this->rentedMovies.erase(tuple<int, int, int>{price, shop, movie});
    this->unrentedMovie2priceShop[movie].emplace(pair<int, int>{price, shop});
  }

  vector<vector<int>> report() {
    auto ans = vector<vector<int>>{};
    for (auto& [_, shop, movie] : rentedMovies) {
      ans.emplace_back(vector<int>{shop, movie});
      if (ans.size() == 5) {
        break;
      }
    }
    return ans;
  }
};
