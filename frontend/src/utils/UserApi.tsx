class UserApi {
  private _baseUrl: string;

  constructor({ baseUrl }: { baseUrl: string }) {
    this._baseUrl = baseUrl;
  }

  private _checkResponse(response: Response): Promise<any> {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject({ status: response.status, res: response });
  }

  getUserInfo(): Promise<any> {
    const token = localStorage.getItem("token");
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }


  getUserById(id: string): Promise<any> {
    return fetch(`${this._baseUrl}/superusers/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(this._checkResponse)
      .catch(() => console.log("err in superusers"));
  }

  deleteUser = (userId: string) => {
    const token = localStorage.getItem("token");
    return fetch(`${this._baseUrl}/users/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка при удалении пользователя");
        }
        return response.json();
      })
      .then((data) => data.message)
      .catch((error) => {
        console.error("Ошибка при удалении пользователя:", error.message);
        throw error;
      });
  };
}

export const userApi = new UserApi({
  baseUrl: "http://localhost:4000",
});
