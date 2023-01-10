import { Field, ObjectType } from 'type-graphql'
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@ObjectType()
@Entity()
export class Task extends BaseEntity{
    @Field()
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column()
    task: string

    @Field()
    @CreateDateColumn()
    cretedAt: Date

    @Field()
    @CreateDateColumn()
    updatedAt: Date

    @Field()
    @Column()
    isComplete: boolean
}