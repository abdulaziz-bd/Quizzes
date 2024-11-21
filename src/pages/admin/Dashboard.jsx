import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import ManageBoard from "../../components/admin/dashboard/ManageBoard";
import { fetchQuizSetList } from "../../redux/features/quizSetList/quizSetListSlice";

export default function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Quizzes Dashboard";
  }, []);

  useEffect(() => {
    dispatch(fetchQuizSetList());
  }, []);

  return <ManageBoard />;
}
