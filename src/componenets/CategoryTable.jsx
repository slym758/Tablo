import { useState } from "react";
import { categories } from "../data/data";

function CategoryTable() {
  const [categoryList, setcategoryList] = useState(categories);
  const [isAsc, setIsAsc] = useState(true);
  const [name, setname] = useState("");
  const deleteCategory = (id) => {
    let filteredCategories = categoryList.filter((q) => q.id !== id);
    setcategoryList([...filteredCategories]);
  };

  const sortByName = () => {
    if (isAsc) {
      let sortedCategories = categoryList.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setcategoryList([...sortedCategories]);
    } else {
      let sortedCategories = categoryList.sort((a, b) =>
        b.name.localeCompare(a.name)
      );
      setcategoryList([...sortedCategories]);
    }
    setIsAsc(!isAsc);
  };

  const search = (value) => {
    let filteredCategories = categories.filter((q) =>
      q.name.toLowerCase().includes(value.toLowerCase())
    );
    setcategoryList([...filteredCategories]);
  };

  const price = () => {
    let a = categoryList.filter((price) => price.unitPrice > 20);
    setcategoryList([...a]);
  };

  return (
    <>
      <div>
        <label>Serach</label>
        <input type="text" onChange={(e) => search(e.target.value)} />
      </div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th style={{ cursor: "pointer" }} onClick={() => sortByName()}>
              Name
            </th>
            <th>Stock</th>
            <th style={{ cursor: "pointer" }} onClick={() => price()}>
              Unit Price
            </th>
            <th>QuantityPerUnit</th>
          </tr>
        </thead>
        <tbody>
          {categoryList.map((item) => {
            if (item.unitsInStock === 0) {
              return false;
            }
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.unitsInStock}</td>
                <td className={`${item.unitPrice > 20 ? "color" : ""}`}>
                  {item.unitPrice}
                </td>
                <td>{item.quantityPerUnit}</td>
                <td>
                  <button onClick={() => deleteCategory(item.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={() => setcategoryList([])}>Delete All</button>
    </>
  );
}

export default CategoryTable;
