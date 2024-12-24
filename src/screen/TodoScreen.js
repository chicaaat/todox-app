import {  
    FlatList, 
    StyleSheet, 
    Text,  
    TextInput,  
    TouchableOpacity,  
    View  
} from "react-native"; 
import React, { useState } from "react"; 
import { IconButton, Checkbox } from "react-native-paper";
import Fallback from "../components/Fallback";

const TodoScreen = () => {
    
    const [todo, setTodo] = useState("");
    const [todoList, setTodoList] = useState([]);
    const [editedTodo, setEditedTodo] = useState(null);
    const [filter, setFilter] = useState("all"); 


    const handleSaveTodo = () => {
        if (todo.trim()) {
            if (editedTodo) {
            
                const updatedTodoList = todoList.map((item) =>
                    item.id === editedTodo.id ? { ...item, title: todo } : item
                );
                setTodoList(updatedTodoList);
                setEditedTodo(null); 
            } else {
                
                setTodoList([...todoList, { id: Date.now().toString(), title: todo, completed: false }]);
            }
            setTodo("")
        }
    };

    // Удаление задачи
    const handleDeleteTodo = (id) => {
        const updatedTodoList = todoList.filter((todo) => todo.id !== id);
        setTodoList(updatedTodoList);
    };

    // Редактирование задачи
    const handleEditTodo = (todo) => {
        setEditedTodo(todo); 
        setTodo(todo.title); 
    };

    // Переключение состояния выполнено/не выполнено
    const toggleCompleteTodo = (id) => {
        const updatedTodoList = todoList.map((item) =>
            item.id === id ? { ...item, completed: !item.completed } : item
        );
        setTodoList(updatedTodoList);
    };

    // Фильтрация задач
    const filteredTodos = todoList.filter(item => {
        if (filter === "completed") return item.completed;
        if (filter === "pending") return !item.completed;
        return true;
    });

    // Рендеринг задачи
    const renderTodos = ({ item }) => (
        <View  
            style={{ 
                backgroundColor: item.completed ? "#32CD32" : "blue", 
                borderRadius: 6,  
                paddingHorizontal: 5, 
                paddingVertical: 6, 
                marginBottom: 12,
                flexDirection: "row",
                alignItems: "center",
                elevation: item.completed ? 10 : 15, 
            }} 
        > 
            <Checkbox 
                status={item.completed ? "checked" : "unchecked"}
                onPress={() => toggleCompleteTodo(item.id)} 
                color="white"
            />
            <Text 
                style={{ 
                    color: "#fff", 
                    fontSize: 20, 
                    fontWeight: "800", 
                    flex: 1, 
                    textDecorationLine: item.completed ? "line-through" : "none" 
                }}
            >
                {item.title}
            </Text>
            <IconButton 
                icon="pencil" 
                iconColor="black" 
                onPress={() => handleEditTodo(item)} 
            />
            <IconButton 
                icon="trash-can" 
                iconColor="red" 
                onPress={() => handleDeleteTodo(item.id)} 
            /> 
        </View> 
    );

    return ( 
        <View style={{ marginHorizontal: 16 }}> 

            
            <TextInput  
                style={{  
                    borderWidth: 2,            
                    borderColor: "#1e90ff",  
                    borderRadius: 6,  
                    paddingVertical: 12, 
                    paddingHorizontal: 16, 
                    marginTop: 30, 
                }} 
                placeholder="Добавить задачу" 
                value={todo}
                onChangeText={setTodo}
            /> 

            {/* Фильтрация задач */}
            <View style={{ flexDirection: "row", justifyContent: "space-around", marginBottom: 20 }}>
                <TouchableOpacity 
                    style={[styles.filterButton, filter === "all" && styles.activeFilterButton]}
                    onPress={() => setFilter("all")}
                >
                    <Text style={[styles.filterButtonText, filter === "all" && styles.activeFilterButtonText]}>Все</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.filterButton, filter === "completed" && styles.activeFilterButton]}
                    onPress={() => setFilter("completed")}
                >
                    <Text style={[styles.filterButtonText, filter === "completed" && styles.activeFilterButtonText]}>Выполненные</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.filterButton, filter === "pending" && styles.activeFilterButton]}
                    onPress={() => setFilter("pending")}
                >
                    <Text style={[styles.filterButtonText, filter === "pending" && styles.activeFilterButtonText]}>Не выполненные</Text>
                </TouchableOpacity>
            </View>

            {/* Кнопка для добавления/обновления задачи */}
            <TouchableOpacity  
                style={{ 
                    backgroundColor: "#000",  
                    borderRadius: 6,  
                    paddingVertical: 12, 
                    marginVertical: 25, 
                    marginTop: 2,
                    alignItems: "center", 
                }} 
                onPress={handleSaveTodo}
            > 
                <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}> 
                    {editedTodo ? "Обновить" : "Добавить"}
                </Text> 
            </TouchableOpacity> 

            {/* Список задач */}
            <FlatList 
                data={filteredTodos} 
                renderItem={renderTodos} 
                keyExtractor={item => item.id} 
            />

            {filteredTodos.length <= 0 && <Fallback />}
        </View> 
    ); 
}; 

const styles = StyleSheet.create({
    filterButton: {
        backgroundColor: "blue",  
        borderRadius: 6,  
        paddingVertical: 10,
        marginRight:5,
        marginTop:20,
        paddingHorizontal: 10,
        alignItems: "center", 
    },
    filterButtonText: {
        color: "#fff", 
        fontWeight: "bold", 
        fontSize: 16,
    },
    activeFilterButton: {
        backgroundColor: "red", 
    },
    activeFilterButtonText: {
        color: "#fff", 
    },
});

export default TodoScreen;
