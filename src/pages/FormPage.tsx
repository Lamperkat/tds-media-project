import { FormEvent } from "react";
import { postUser } from "../services/postUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Controller, useForm } from "react-hook-form";
import { User } from "../types/User";
import { Button, Col, Flex, Input, Row, Select, Space, Typography } from "antd";
import { Link } from "react-router-dom";
import { RollbackOutlined } from "@ant-design/icons";

function FormPage() {
  const queryClient = useQueryClient();
  const { reset, handleSubmit, register, getValues, control } = useForm<User>();
  const { mutate, isPending } = useMutation({
    mutationFn: postUser,
    onSuccess: () => {
      toast.success("Успешно добавлен пользователь");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  function onSubmit(data: User) {
    mutate(data);
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex vertical gap={20}>
        <Link to="..">
          <Button>
            Вернуться <RollbackOutlined />
          </Button>
        </Link>
        <Typography.Title level={3} style={{ textAlign: "center" }}>
          Добавить пользователя
        </Typography.Title>
        <Row gutter={16}>
          <Col className="gutter-row" span={6}>
            <Input
              required
              type="text"
              placeholder="Имя"
              id="name"
              {...register("name")}
            />
          </Col>
          <Col className="gutter-row" span={6}>
            <Input
              required
              type="text"
              placeholder="Фамилия"
              id="surname"
              {...register("surname")}
            />
          </Col>
          <Col className="gutter-row" span={6}>
            <Input
              required
              type="email"
              placeholder="Email"
              id="email"
              {...register("email")}
            />
          </Col>
          <Col className="gutter-row" span={6}>
            <Controller
              name="skills"
              control={control}
              render={({ field }) => (
                <Select
                  style={{ width: "100%" }}
                  {...field}
                  mode="tags"
                  placeholder="Навыки"
                  id="skills"
                  notFoundContent="Добавьте навыки"
                  onChange={(value) => field.onChange(value)}
                  value={field.value || []}
                />
              )}
            />
          </Col>
        </Row>
        <Button htmlType="submit" disabled={isPending}>
          Отправить
        </Button>
      </Flex>
    </form>
  );
}

export default FormPage;
