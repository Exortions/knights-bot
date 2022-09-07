"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Interactions {
    static addInteraction(interaction, value) {
        this.interactions.push([interaction, value]);
    }
    static getInteraction(interaction) {
        for (const [key, value] of Object.entries(this.interactions)) {
            if (key === interaction)
                return value;
        }
        return null;
    }
}
exports.default = Interactions;
Interactions.interactions = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZXJhY3Rpb25zLmpzIiwic291cmNlUm9vdCI6InNyYy8iLCJzb3VyY2VzIjpbInNyYy91dGlscy9JbnRlcmFjdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxNQUFxQixZQUFZO0lBR3RCLE1BQU0sQ0FBQyxjQUFjLENBQUMsV0FBbUIsRUFBRSxLQUFVO1FBQ3hELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVNLE1BQU0sQ0FBQyxjQUFjLENBQUMsV0FBbUI7UUFFNUMsS0FBSyxNQUFNLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQzFELElBQUksR0FBRyxLQUFLLFdBQVc7Z0JBQUUsT0FBTyxLQUFLLENBQUM7U0FDekM7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDOztBQWRMLCtCQWVDO0FBZGtCLHlCQUFZLEdBQVEsRUFBRSxDQUFDIn0=