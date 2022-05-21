import React, { useState } from "react";
import { IColumnItems } from "../interface/datatable";
import { DataModal } from "./modal";
import { Button, notification } from "antd";
import styles from "./datatable.module.css";
import { Input } from "antd";
export function DataTable() {
  const [rows, setRows] = useState<IColumnItems>([]);
  const [columnName, setColumnName] = useState("");
  const [initialColumns, setIntialColumns] = useState<IColumnItems>([
    { name: "S.NO" }
  ]);
  const [columns, setColumns] = useState<IColumnItems>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [columnError, setColumnError] = useState("");

  const showModal = () => {
    setColumnName("");
    setIsModalVisible(true);
    setColumnError("");
  };

  const handleAddRow = () => {
    let empty = {};
    setRows([...rows, empty]);
  };

  const handleAddColumn = () => {
    const item = {
      name: columnName
    };
    if (columnName.length > 0) {
      setIntialColumns([...initialColumns, item]);
      setColumns([...columns, item]);
      handleCancel();
      setColumnName("");
    }
    return;
  };

  const updateState = (e: any) => {
    let target = e.target.attributes as any;
    console.log(target, "updateState");
    let prope = target["data-column"].value;
    let index = target["data-index"].value;
    let fieldValue = e.target.value;
    const tempObj = rows[index] as any;
    tempObj[prope] = fieldValue;
    rows[index] = tempObj;
    setRows(rows);
  };

  const postResults = () => {
    let isToast = false;
    rows.map((each) => Object.keys(each).length >= 1)
      ? console.log(rows)
      : (isToast = true);

    if (isToast)
      notification.open({
        message: "Please updated atleast one cell in all rows"
      });
  };

  const handleColumnChange = (e: any) => {
    const name = e.target.value.toLowerCase();
    initialColumns.map((column) => {
      if (column.name === name) {
        setColumnError("Duplicate column found");
      } else {
        setColumnName(name);
        setColumnError("");
      }
      return null;
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setColumnName("");
    setColumnError("");
  };

  const handleOnSubmit = () => {
    handleAddColumn();
  };

  return (
    <div>
      <div className="container">
        <div>
          <div>
            <div className={styles.columnHeader}>
              <table className={styles.customers}>
                <thead>
                  <tr>
                    {initialColumns.map((column, index) => (
                      <th
                        className={index !== 0 ? styles.initialHeader : ""}
                        key={index}
                      >
                        {column.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((item, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      {columns.map((column, index) => (
                        <td key={index}>
                          <Input
                            type="text"
                            data-column={column.name}
                            data-index={idx}
                            value={rows?.idx?.column}
                            onChange={(e) => updateState(e)}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {
                <DataModal
                  handleColumnChange={handleColumnChange}
                  handleOnSubmit={handleOnSubmit}
                  showModal={showModal}
                  isModalVisible={isModalVisible}
                  handleCancel={handleCancel}
                  columnName={columnName}
                  columnError={columnError}
                />
              }
            </div>
          </div>
          <Button onClick={handleAddRow} type="primary">
            +
          </Button>
        </div>
        <Button
          onClick={postResults}
          type="primary"
          className={styles.saveButton}
        >
          save
        </Button>
      </div>
    </div>
  );
}
