

  class Questions {
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

    async postNewQuestionary(questionarySettings, questions){
        const fullQuestionary = {
            ...questionarySettings,
            questions: [...questions],
        };
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:4000/questionary", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // если используешь JWT
            },
            body: JSON.stringify(
                fullQuestionary
            )
        })   
        const data = await response.json();
        console.log(data)
        return data;
    } 
    
    async getMyQuestionaries(){
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:4000/myquestionaries", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // если используешь JWT
            },
            })
        const data = await res.json();
        return data;   
    }

    async fetchQuestionaryById(id){
        const res = await fetch(`http://localhost:4000/questionary/${id}`);
        if (!res.ok) throw new Error('Анкета не найдена');
        const data = await res.json();
        return data;
    };

    async postAnswers(id, body){
        const response = await fetch(`http://localhost:4000/answers/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
            });
        return response.json()
    };

    async getResults(id){
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:4000/questionary/${id}/results`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            })
        const data = await res.json();
        return data;   
    }


}

export const questionsApi = new Questions({
  baseUrl: "http://localhost:4000",
})