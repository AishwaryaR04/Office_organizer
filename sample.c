#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_TASKS 100

typedef struct {
    char description[200];
} Task;

Task tasks[MAX_TASKS];
int task_count = 0;

int is_duplicate(const char *description) {
    for (int i = 0; i < task_count; i++) {
        if (strcmp(tasks[i].description, description) == 0) {
            return 1; // Duplicate found
        }
    }
    return 0;
}

// Add a new task
void add_task(const char *description) {
    if (task_count < MAX_TASKS) {
        if (is_duplicate(description)) {
            printf("Task already exists: %s\n", description);
            return;
        }

        strcpy(tasks[task_count].description, description);
        task_count++;

        FILE *file = fopen("tasks.txt", "a");
        if (file != NULL) {
            fprintf(file, "%s\n", description);
            fclose(file);
            printf("Task added: %s\n", description);
        } else {
            printf("Error: Cannot open file.\n");
        }
    } else {
        printf("Error: Task storage limit reached.\n");
    }
}

int main(int argc, char *argv[]) {
    if (argc > 1) {
        add_task(argv[1]);
    } else {
        printf("No task provided.\n");
    }
    return 0;
}
