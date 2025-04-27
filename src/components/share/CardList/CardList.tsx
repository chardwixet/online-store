import { useQuery } from "@tanstack/react-query";
import { Card } from "../Card/Card";
import style from "./CardList.module.scss";
import { computersGet } from "@/api/Computers";

export function CardList() {
  const { data, isFetching, status, refetch, error } = useQuery({
    queryFn: computersGet,
    queryKey: ["computers"],
  });

  if (isFetching) {
    // return <Loader />;
    return <span>Loading...</span>;
  }

  if (status === "success") {
    return (
      <div className={style.content}>
        {data.map((item) => (
          <div key={item.title}>
            <h2 className={style.title}>{item.title}</h2>
            <ul className={style.list}>
              {item.computers.map((computer) => (
                <li key={computer.title + computer.id}>
                  <Card item={computer} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    console.log(error);
    return (
      <div>
        <span>Повторите ошибку</span>
        <button onClick={() => refetch()}></button>
      </div>
    );
  }
}
