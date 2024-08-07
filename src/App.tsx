import { Button, Flex, Input, Layout } from "antd";
import "./App.css";
import Table from "./components/Table/Table";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "./store/userStore";

function App() {
  const { query, setQuery } = useUserStore();
  const nav = useNavigate();
  const handlePageChange = () => {
    // Start the animation and then navigate to the new page

    nav("/add-user"); // Change to your target route
  };

  return (
    <Flex vertical style={{ width: "80vw", margin: "20px auto" }}>
      <Flex justify="space-between">
        <Input
          style={{
            width: 400,
          }}
          placeholder="Найти пользователей по имени"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <Button type="primary" onClick={handlePageChange}>
          Добавить пользователя
        </Button>
      </Flex>
      <Table />
    </Flex>
    // </motion.div>
  );
}

export default App;
