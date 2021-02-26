export interface IRepos {
  id: number;
  name: string;
  private: boolean;
  html_url: string;
  description: string;
  fork: boolean;
  language: string;
  stargazers_count: number;
}

interface IProps {
  card: IRepos;
}
const CardRepos = ({ card }: IProps) => {
  return (
    <div className="  mb-5 m-2">
      <div
        className="card bg-dark border-dark text-light shadow-lg p-3 mb-5  rounded
      "
      >
        <div className="card-body ">
          <h5 className="card-title">{card.name}</h5>
          <div className=" row my-3">
            {card.fork && (
              <span className="card-subtitle  rounded bg-primary p-1 mb-3 text-light ">
                Fork
              </span>
            )}
            {card.language && (
              <span className="card-subtitle rounded bg-primary p-1 ml-2  mb-3 text-light">
                {card.language}
              </span>
            )}

            <span className="card-subtitle rounded bg-primary p-1 ml-2 mb-3 text-light">
              {card.private ? 'Private' : 'Public'}
            </span>

            <span className="card-subtitle rounded bg-warning p-1 ml-2 mb-3 text-light">
              stars {card.stargazers_count}
            </span>
          </div>
          <p className="card-text">{card.description}</p>

          <a
            href={card.html_url}
            target="blank"
            className="btn btn-success btn-sm"
          >
            Details
          </a>
        </div>
      </div>
    </div>
  );
};

export default CardRepos;
