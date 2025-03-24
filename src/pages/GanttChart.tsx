import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar, Plus, X, Trash, Edit } from 'lucide-react';

interface Task {
  id: number;
  name: string;
  start: string;
  end: string;
  progress: number;
  dependencies: number[];
}

const tasks = [
  {
    id: 1,
    name: 'Research Phase',
    start: '2024-03-01',
    end: '2024-03-15',
    progress: 100,
    dependencies: [],
  },
  {
    id: 2,
    name: 'Design Phase',
    start: '2024-03-16',
    end: '2024-03-31',
    progress: 85,
    dependencies: [1],
  },
  {
    id: 3,
    name: 'Development Phase',
    start: '2024-04-01',
    end: '2024-04-30',
    progress: 45,
    dependencies: [2],
  },
];

const GanttChart = () => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // Track if modal is in edit mode
  const [tasksList, setTasksList] = useState<Task[]>(tasks);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    name: '',
    start: '',
    end: '',
    progress: 0,
    dependencies: [],
  });

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.name && newTask.start && newTask.end) {
      const task: Task = {
        id: tasksList.length + 1,
        name: newTask.name,
        start: newTask.start,
        end: newTask.end,
        progress: newTask.progress || 0,
        dependencies: newTask.dependencies || [],
      };
      setTasksList([...tasksList, task]);
      setNewTask({
        name: '',
        start: '',
        end: '',
        progress: 0,
        dependencies: [],
      });
      setIsModalOpen(false);
    }
  };

  const handleUpdateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.id && newTask.name && newTask.start && newTask.end) {
      const updatedTasks = tasksList.map(task =>
        task.id === newTask.id
          ? {
              ...task,
              name: newTask.name,
              start: newTask.start,
              end: newTask.end,
              progress: newTask.progress || 0,
              dependencies: newTask.dependencies || [],
            }
          : task
      );
      setTasksList(updatedTasks);
      setNewTask({
        name: '',
        start: '',
        end: '',
        progress: 0,
        dependencies: [],
      });
      setIsModalOpen(false);
      setIsEditMode(false);
    }
  };

  const handleRemoveTask = (id: number) => {
    setTasksList(tasksList.filter(task => task.id !== id));
    if (selectedTask?.id === id) setSelectedTask(null); // Clear selected task if it's deleted
  };

  const handleProgressChange = (id: number, progress: number) => {
    setTasksList(tasksList.map(task =>
      task.id === id ? { ...task, progress } : task
    ));
  };

  const handleEditTask = (task: Task) => {
    setNewTask(task); // Pre-fill modal with task details
    setIsEditMode(true); // Set modal to edit mode
    setIsModalOpen(true); // Open modal
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Project Timeline</h1>
        <button 
          onClick={() => {
            setIsEditMode(false); // Set modal to add mode
            setIsModalOpen(true); // Open modal
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Task
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="space-y-4">
          {tasksList.map((task) => (
            <div
              key={task.id}
              className="relative"
              onClick={() => setSelectedTask(task)}
            >
              <div className="flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-lg cursor-pointer">
                <div className="w-1/4">
                  <h3 className="font-medium text-gray-900">{task.name}</h3>
                </div>
                <div className="flex-1">
                  <div className="h-6 bg-gray-200 rounded-full relative">
                    <div
                      className="h-6 bg-indigo-600 rounded-full"
                      style={{ width: `${task.progress}%` }}
                    />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={task.progress}
                      onChange={(e) => handleProgressChange(task.id, parseInt(e.target.value))}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
                <div className="w-1/4 flex items-center space-x-2 text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>{format(new Date(task.start), 'MMM d')} - {format(new Date(task.end), 'MMM d')}</span>
                </div>
                <div className="w-20 text-right">
                  <span className="font-medium">{task.progress}%</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent task selection
                      handleEditTask(task); // Open modal in edit mode
                    }}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent task selection
                      handleRemoveTask(task.id); // Remove task
                    }}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedTask && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Task Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Task Name</p>
              <p className="font-medium">{selectedTask.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Progress</p>
              <p className="font-medium">{selectedTask.progress}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Start Date</p>
              <p className="font-medium">{format(new Date(selectedTask.start), 'MMM d, yyyy')}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">End Date</p>
              <p className="font-medium">{format(new Date(selectedTask.end), 'MMM d, yyyy')}</p>
            </div>
            {selectedTask.dependencies.length > 0 && (
              <div className="col-span-2">
                <p className="text-sm text-gray-500">Dependencies</p>
                <p className="font-medium">
                  {selectedTask.dependencies.map(depId => 
                    tasksList.find(t => t.id === depId)?.name
                  ).join(', ')}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add/Edit Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{isEditMode ? 'Edit Task' : 'Add New Task'}</h2>
              <button 
                onClick={() => {
                  setIsModalOpen(false);
                  setIsEditMode(false);
                  setNewTask({
                    name: '',
                    start: '',
                    end: '',
                    progress: 0,
                    dependencies: [],
                  });
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={isEditMode ? handleUpdateTask : handleAddTask} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Task Name</label>
                <input
                  type="text"
                  value={newTask.name}
                  onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="date"
                  value={newTask.start}
                  onChange={(e) => setNewTask({ ...newTask, start: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                  type="date"
                  value={newTask.end}
                  onChange={(e) => setNewTask({ ...newTask, end: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Progress (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={newTask.progress}
                  onChange={(e) => setNewTask({ ...newTask, progress: Number(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Dependencies</label>
                <select
                  multiple
                  value={newTask.dependencies}
                  onChange={(e) => setNewTask({ 
                    ...newTask, 
                    dependencies: Array.from(e.target.selectedOptions, option => Number(option.value))
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  {tasksList.map(task => (
                    <option key={task.id} value={task.id}>{task.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setIsEditMode(false);
                    setNewTask({
                      name: '',
                      start: '',
                      end: '',
                      progress: 0,
                      dependencies: [],
                    });
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  {isEditMode ? 'Update Task' : 'Add Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GanttChart;